
package com.logcat.tribegreen.data.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage

private data class HomeCategory(
    val title: String,
    val description: String,
    val image: String
)

private data class HomeSolution(
    val title: String,
    val description: String,
    val image: String
)

private val categories = listOf(
    HomeCategory(
        "Drinkware",
        "Thoughtful everyday essentials.",
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85"
    ),
    HomeCategory(
        "Apparel & Accessories",
        "Branded merchandise with personality.",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85"
    ),
    HomeCategory(
        "Office Essentials",
        "Make every workday more meaningful.",
        "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=85"
    ),
    HomeCategory(
        "Gift Hampers",
        "Beautifully curated gifting experiences.",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85"
    )
)

private val solutions = listOf(
    HomeSolution(
        "Employee Onboarding",
        "Welcome new team members with thoughtfully curated joining kits.",
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900&q=85"
    ),
    HomeSolution(
        "Client & Partner Gifting",
        "Build lasting business relationships with memorable gifts.",
        "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=900&q=85"
    ),
    HomeSolution(
        "Events & Celebrations",
        "Make corporate events and special occasions unforgettable.",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85"
    )
)

@Composable
fun HomeScreen(
    onExploreCollection: () -> Unit,
    onRequestProposal: () -> Unit,
    onAboutClick: () -> Unit,
    onContactClick: () -> Unit

) {
    val colors = MaterialTheme.colorScheme

    val background = colors.background
    val heading = colors.onBackground
    val bodyText = colors.onSurfaceVariant
    val accent = colors.primary
    val buttonText = colors.onPrimary

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .verticalScroll(rememberScrollState())
    ) {

        // HEADER
        // HEADER
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "✧ TRIBE GREEN",
                    color = heading,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )

                Text(
                    text = "THOUGHTFUL GIFTING",
                    color = bodyText,
                    fontSize = 9.sp,
                    letterSpacing = 2.sp
                )
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                TextButton(onClick = onAboutClick) {
                    Text(
                        text = "About",
                        color = heading,
                        fontSize = 11.sp
                    )
                }

                TextButton(onClick = onContactClick) {
                    Text(
                        text = "Contact",
                        color = heading,
                        fontSize = 11.sp
                    )
                }

                Text(
                    text = "Explore",
                    color = colors.onSecondary,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(colors.secondary)
                        .clickable {
                            onExploreCollection()
                        }
                        .padding(horizontal = 10.dp, vertical = 10.dp)
                )
            }
        }

        // HERO SECTION
        Column(
            modifier = Modifier.padding(horizontal = 22.dp)
        ) {
            Spacer(modifier = Modifier.height(18.dp))

            Eyebrow("THOUGHTFUL CORPORATE GIFTING")

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Make every\nconnection meaningful.",
                color = heading,
                fontSize = 39.sp,
                lineHeight = 45.sp,
                fontFamily = FontFamily.Serif
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Discover thoughtfully curated corporate gifts that celebrate people, strengthen relationships and make every occasion memorable.",
                color = bodyText,
                fontSize = 14.sp,
                lineHeight = 22.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            AccentButton(
                text = "Explore Collection  →",
                onClick = onExploreCollection
            )

            TextButton(onClick = onRequestProposal) {
                Text(
                    text = "Request a Proposal  →",
                    color = heading
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            AsyncImage(
                model = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90",
                contentDescription = "Beautifully wrapped premium gift boxes",
                modifier = Modifier
                    .fillMaxWidth()
                    .height(245.dp)
                    .clip(RoundedCornerShape(4.dp))
            )

            Spacer(modifier = Modifier.height(10.dp))

            Eyebrow("THE ART OF GIVING")

            Text(
                text = "Made to be remembered.",
                color = heading,
                fontFamily = FontFamily.Serif,
                fontSize = 20.sp
            )
        }

        // INTRODUCTION
        Spacer(modifier = Modifier.height(65.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Eyebrow("A LITTLE MORE THOUGHTFUL")

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "More than a gift.\nA meaningful gesture.",
                color = heading,
                fontFamily = FontFamily.Serif,
                fontSize = 29.sp,
                lineHeight = 36.sp
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "At Tribe Green, we believe the right gift can communicate appreciation, celebrate achievements and bring people closer. We help businesses create thoughtful gifting experiences for every milestone.",
                color = bodyText,
                fontSize = 13.sp,
                lineHeight = 21.sp
            )
        }

        // CATEGORIES
        Spacer(modifier = Modifier.height(65.dp))

        SectionHeading(
            eyebrow = "EXPLORE OUR WORLD",
            title = "Gifts for every kind of connection."
        )

        Spacer(modifier = Modifier.height(20.dp))

        Column(
            modifier = Modifier.padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(22.dp)
        ) {
            categories.forEach { category ->
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onExploreCollection() }
                ) {
                    AsyncImage(
                        model = category.image,
                        contentDescription = category.title,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(210.dp)
                            .clip(RoundedCornerShape(4.dp))
                    )

                    Spacer(modifier = Modifier.height(9.dp))

                    Text(
                        text = category.title,
                        color = heading,
                        fontFamily = FontFamily.Serif,
                        fontSize = 20.sp
                    )

                    Text(
                        text = category.description,
                        color = bodyText,
                        fontSize = 12.sp
                    )
                }
            }
        }

        // CORPORATE SOLUTIONS
        Spacer(modifier = Modifier.height(65.dp))

        SectionHeading(
            eyebrow = "MADE FOR BUSINESS",
            title = "Every occasion deserves a thoughtful gift."
        )

        Spacer(modifier = Modifier.height(20.dp))

        Column(
            modifier = Modifier.padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(25.dp)
        ) {
            solutions.forEach { solution ->
                Column {
                    AsyncImage(
                        model = solution.image,
                        contentDescription = solution.title,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(205.dp)
                            .clip(RoundedCornerShape(4.dp))
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = solution.title,
                        color = heading,
                        fontFamily = FontFamily.Serif,
                        fontSize = 21.sp
                    )

                    Spacer(modifier = Modifier.height(5.dp))

                    Text(
                        text = solution.description,
                        color = bodyText,
                        fontSize = 13.sp,
                        lineHeight = 19.sp
                    )

                    TextButton(onClick = onRequestProposal) {
                        Text(
                            text = "Enquire now  →",
                            color = accent
                        )
                    }
                }
            }
        }

        // BENEFITS
        Spacer(modifier = Modifier.height(65.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 22.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Eyebrow("THE TRIBE GREEN DIFFERENCE")

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Thought behind every detail.",
                color = heading,
                fontFamily = FontFamily.Serif,
                fontSize = 28.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "We bring together meaningful products, personal touches and thoughtful presentation.",
                color = bodyText,
                fontSize = 13.sp,
                lineHeight = 20.sp
            )

            Spacer(modifier = Modifier.height(25.dp))

            BenefitItem(
                "✧",
                "Thoughtful Selection",
                "Carefully selected gifting ideas for people and occasions that matter."
            )

            BenefitItem(
                "◈",
                "Personalised Branding",
                "Make gifts memorable with custom branding and personalisation."
            )

            BenefitItem(
                "□",
                "Curated Packaging",
                "Beautiful presentation that makes every gift feel special."
            )

            BenefitItem(
                "⇢",
                "Corporate Orders",
                "Gifting solutions designed for teams, clients and business events."
            )
        }

        // CUSTOMISATION
        Spacer(modifier = Modifier.height(65.dp))

        Column(
            modifier = Modifier.padding(horizontal = 20.dp)
        ) {
            AsyncImage(
                model = "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1100&q=85",
                contentDescription = "Gift packaging and personalised gifting",
                modifier = Modifier
                    .fillMaxWidth()
                    .height(230.dp)
                    .clip(RoundedCornerShape(4.dp))
            )

            Spacer(modifier = Modifier.height(25.dp))

            Eyebrow("MAKE IT YOURS")

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Your brand.\nYour story.\nYour thoughtful gift.",
                color = heading,
                fontFamily = FontFamily.Serif,
                fontSize = 34.sp,
                lineHeight = 40.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Add your brand identity to carefully selected gifts with personalised touches, logo printing and thoughtful packaging.",
                color = bodyText,
                fontSize = 13.sp,
                lineHeight = 21.sp
            )

            Spacer(modifier = Modifier.height(18.dp))

            AccentButton(
                text = "Customise Your Gifts  →",
                onClick = onRequestProposal
            )
        }

        // FINAL CTA
        Spacer(modifier = Modifier.height(75.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 25.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Eyebrow("LET'S CREATE SOMETHING MEANINGFUL")

            Spacer(modifier = Modifier.height(15.dp))

            Text(
                text = "Have a gifting idea\nin mind?",
                color = heading,
                fontFamily = FontFamily.Serif,
                fontSize = 34.sp,
                lineHeight = 40.sp
            )

            Spacer(modifier = Modifier.height(13.dp))

            Text(
                text = "Tell us about your occasion, team or gifting requirements. Let's find something thoughtful together.",
                color = bodyText,
                fontSize = 13.sp,
                lineHeight = 21.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            AccentButton(
                text = "Start Your Enquiry  →",
                onClick = onRequestProposal
            )
        }

        // FOOTER
        // FOOTER
        Spacer(modifier = Modifier.height(65.dp))

        HorizontalDivider(color = colors.outline)

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(22.dp)
        ) {
            Text(
                text = "✧ TRIBE GREEN",
                color = heading,
                fontWeight = FontWeight.Bold,
                fontSize = 17.sp
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "Thoughtful corporate gifting that builds meaningful connections and lasting impressions.",
                color = bodyText,
                fontSize = 12.sp,
                lineHeight = 19.sp
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Explore",
                color = heading,
                fontWeight = FontWeight.Bold
            )

            TextButton(onClick = onExploreCollection) {
                Text(
                    text = "Our Catalogue",
                    color = accent
                )
            }

            TextButton(onClick = onAboutClick) {
                Text(
                    text = "About Us",
                    color = accent
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "Get in touch",
                color = heading,
                fontWeight = FontWeight.Bold
            )

            TextButton(onClick = onContactClick) {
                Text(
                    text = "Contact Us",
                    color = accent
                )
            }

            TextButton(onClick = onRequestProposal) {
                Text(
                    text = "Request a Quote",
                    color = accent
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "© 2026 Tribe Green. All rights reserved.",
                color = bodyText,
                fontSize = 10.sp
            )
        }

        Spacer(modifier = Modifier.height(25.dp))
    }
}

// EYEBROW
@Composable
private fun Eyebrow(text: String) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.primary,
        fontSize = 10.sp,
        letterSpacing = 2.sp,
        fontWeight = FontWeight.SemiBold
    )
}

// SECTION HEADING
@Composable
private fun SectionHeading(
    eyebrow: String,
    title: String
) {
    Column(
        modifier = Modifier.padding(horizontal = 20.dp)
    ) {
        Eyebrow(eyebrow)

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            text = title,
            color = MaterialTheme.colorScheme.onBackground,
            fontFamily = FontFamily.Serif,
            fontSize = 28.sp,
            lineHeight = 34.sp
        )
    }
}

// BENEFIT ITEM
@Composable
private fun BenefitItem(
    icon: String,
    title: String,
    description: String
) {
    val colors = MaterialTheme.colorScheme

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 12.dp)
    ) {
        Text(
            text = icon,
            color = colors.primary,
            fontSize = 24.sp
        )

        Spacer(modifier = Modifier.height(7.dp))

        Text(
            text = title,
            color = colors.onBackground,
            fontFamily = FontFamily.Serif,
            fontSize = 20.sp
        )

        Spacer(modifier = Modifier.height(5.dp))

        Text(
            text = description,
            color = colors.onSurfaceVariant,
            fontSize = 13.sp,
            lineHeight = 19.sp
        )
    }
}

// ACCENT BUTTON
@Composable
private fun AccentButton(
    text: String,
    onClick: () -> Unit
) {
    val colors = MaterialTheme.colorScheme

    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = colors.primary,
            contentColor = colors.onPrimary
        ),
        shape = RoundedCornerShape(6.dp)
    ) {
        Text(
            text = text,
            fontWeight = FontWeight.SemiBold
        )
    }
}
