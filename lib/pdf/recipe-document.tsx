import "server-only";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Recipe } from "@/lib/recipes";

// Printable recipe (US Letter). Rendered on the server by app/(main)/recipes/[id]/pdf/route.ts.
// The photo is only the user's uploaded one (passed in as bytes); nothing is fetched from the web.

const ACCENT = "#D9703B"; // the app's orange
const INK = "#2A1F1A";
const MUTED = "#7A6B62";
const LINE = "#EADFD7";
const TINT = "#FBF1EA";

const styles = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 44, paddingHorizontal: 44, fontFamily: "Helvetica", fontSize: 10.5, color: INK, lineHeight: 1.4 },
  pills: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 8 },
  category: { backgroundColor: ACCENT, color: "#FFFFFF", fontSize: 8.5, fontFamily: "Helvetica-Bold", paddingVertical: 2.5, paddingHorizontal: 7, borderRadius: 8 },
  tag: { borderWidth: 0.75, borderColor: LINE, color: MUTED, fontSize: 8.5, paddingVertical: 2, paddingHorizontal: 7, borderRadius: 8 },
  title: { fontSize: 26, fontFamily: "Helvetica-Bold", lineHeight: 1.15, marginBottom: 6 },
  description: { fontSize: 11.5, color: MUTED, marginBottom: 14 },
  photo: { width: "100%", height: 180, objectFit: "cover", borderRadius: 8, marginBottom: 14 },
  stats: { flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: LINE, paddingVertical: 8, marginBottom: 18 },
  stat: { flex: 1, alignItems: "center" },
  statLabel: { fontSize: 7.5, color: MUTED, textTransform: "uppercase", letterSpacing: 0.8 },
  statValue: { fontSize: 12, fontFamily: "Helvetica-Bold", marginTop: 2 },
  columns: { flexDirection: "row", gap: 22 },
  left: { width: "36%" },
  right: { flex: 1 },
  heading: { fontSize: 13, fontFamily: "Helvetica-Bold", color: ACCENT, marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1.5, borderBottomColor: ACCENT },
  ingredient: { flexDirection: "row", marginBottom: 5 },
  bullet: { width: 10, color: ACCENT, fontFamily: "Helvetica-Bold" },
  amount: { fontFamily: "Helvetica-Bold" },
  step: { flexDirection: "row", marginBottom: 10 },
  stepNumber: { width: 20, height: 20, borderRadius: 10, backgroundColor: ACCENT, color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 10, textAlign: "center", paddingTop: 4.5, marginRight: 9 },
  stepBody: { flex: 1, paddingTop: 2 },
  tip: { marginTop: 5, backgroundColor: TINT, borderLeftWidth: 2.5, borderLeftColor: ACCENT, paddingVertical: 4, paddingHorizontal: 7, fontSize: 9.5, color: INK },
  tipLabel: { fontFamily: "Helvetica-Bold", color: ACCENT },
});

const minutes = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);

export function RecipeDocument({ recipe, photo }: { recipe: Recipe; photo: Uint8Array | null }) {
  const stats: [string, string][] = [
    ["Prep", minutes(recipe.prepTime)],
    ["Cook", minutes(recipe.cookTime)],
    ["Total", minutes(recipe.prepTime + recipe.cookTime)],
    ["Servings", String(recipe.servings)],
    ["Difficulty", recipe.difficulty],
  ];

  return (
    <Document title={recipe.title} author={recipe.ownerName} creator="Decide My Dinner" producer="Decide My Dinner">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pills}>
          <Text style={styles.category}>{recipe.category}</Text>
          {recipe.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.description ? <Text style={styles.description}>{recipe.description}</Text> : null}

        {photo ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image, not an HTML <img>
          <Image style={styles.photo} src={{ data: Buffer.from(photo), format: "jpg" }} />
        ) : null}

        <View style={styles.stats} wrap={false}>
          {stats.map(([label, value]) => (
            <View key={label} style={styles.stat}>
              <Text style={styles.statLabel}>{label}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.columns}>
          <View style={styles.left}>
            <Text style={styles.heading}>Ingredients</Text>
            {recipe.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredient} wrap={false}>
                <Text style={styles.bullet}>•</Text>
                <Text style={{ flex: 1 }}>
                  {(ing.amount || ing.unit) && (
                    <Text style={styles.amount}>{[ing.amount, ing.unit].filter(Boolean).join(" ")} </Text>
                  )}
                  {ing.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.right}>
            <Text style={styles.heading}>Instructions</Text>
            {recipe.instructions.map((step) => (
              // Keep each step together with its tip when the recipe runs onto another page
              <View key={step.step} style={styles.step} wrap={false}>
                <Text style={styles.stepNumber}>{step.step}</Text>
                <View style={styles.stepBody}>
                  <Text>{step.text}</Text>
                  {step.tip ? (
                    <Text style={styles.tip}>
                      <Text style={styles.tipLabel}>Chef&apos;s tip: </Text>
                      {step.tip}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
