
package com.logcat.tribegreen.data.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.CardGiftcard
import androidx.compose.material.icons.filled.Eco
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.TrackChanges
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage

@Composable
fun AboutScreen(
    onExploreCollection: () -> Unit,
    onContactClick: () -> Unit
) {
    val colors = MaterialTheme.colorScheme

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background)
            .verticalScroll(rememberScrollState())
    ) {

        // Hero Section
        Column(
            modifier = Modifier.padding(24.dp)
        ) {
            EyebrowText("OUR STORY")

            Text(
                text = "Making Every Connection Meaningful.",
                style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "At Tribe Green, we believe corporate gifting is more than exchanging presents. It is about building relationships, expressing appreciation and creating meaningful connections.",
                style = MaterialTheme.typography.bodyLarge,
                color = colors.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(20.dp))

            Button(
                onClick = onExploreCollection,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Explore Our Collection")
            }
        }

        AsyncImage(
            model = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90",
            contentDescription = "Tribe Green gift collection",
            modifier = Modifier
                .fillMaxWidth()
                .height(260.dp),
            contentScale = ContentScale.Crop
        )

        // Who We Are
        AboutSection {
            EyebrowText("WHO WE ARE")

            Text(
                text = "Gifting That Goes Beyond the Ordinary",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(12.dp))

            AsyncImage(
                model = "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000&q=85",
                contentDescription = "Thoughtfully arranged gifts",
                modifier = Modifier
                    .fillMaxWidth()
                    .height(220.dp),
                contentScale = ContentScale.Crop
            )

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Tribe Green brings together thoughtfully selected products and personalised gifting solutions for businesses.",
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Whether you are welcoming new employees, appreciating valuable clients or celebrating important milestones, we help make every gifting experience special.",
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Our approach combines thoughtful selection, quality, personalisation and elegant presentation.",
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyLarge
            )
        }

        // Mission
        AboutSection {
            AboutInfoCard(
                icon = {
                    Icon(
                        Icons.Default.TrackChanges,
                        contentDescription = null,
                        tint = colors.primary,
                        modifier = Modifier.size(30.dp)
                    )
                },
                eyebrow = "OUR MISSION",
                title = "Make Every Gift Meaningful",
                description = "To help businesses express appreciation and strengthen relationships through thoughtful, personalised corporate gifting experiences."
            )

            Spacer(modifier = Modifier.height(18.dp))

            AboutInfoCard(
                icon = {
                    Icon(
                        Icons.Default.Visibility,
                        contentDescription = null,
                        tint = colors.primary,
                        modifier = Modifier.size(30.dp)
                    )
                },
                eyebrow = "OUR VISION",
                title = "Build Lasting Connections",
                description = "To make corporate gifting a more thoughtful experience where every product communicates care, recognition and connection."
            )
        }

        // Values
        AboutSection {
            EyebrowText("WHAT MATTERS TO US")

            Text(
                text = "Our Values",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(20.dp))

            AboutValueCard(
                icon = {
                    Icon(
                        Icons.Default.Favorite,
                        contentDescription = null,
                        tint = colors.primary
                    )
                },
                title = "Thoughtful Selection",
                description = "We carefully select meaningful products that make every corporate gift memorable."
            )

            Spacer(modifier = Modifier.height(14.dp))

            AboutValueCard(
                icon = {
                    Icon(
                        Icons.Default.Eco,
                        contentDescription = null,
                        tint = colors.primary
                    )
                },
                title = "Quality & Sustainability",
                description = "We focus on quality products and thoughtful choices that create lasting value."
            )

            Spacer(modifier = Modifier.height(14.dp))

            AboutValueCard(
                icon = {
                    Icon(
                        Icons.Default.CardGiftcard,
                        contentDescription = null,
                        tint = colors.primary
                    )
                },
                title = "Personalised Gifting",
                description = "From branded merchandise to customised gift boxes, we make gifting personal."
            )
        }

        // Why Tribe Green
        AboutSection {
            EyebrowText("WHY TRIBE GREEN")

            Text(
                text = "Thoughtful Details. Meaningful Experiences.",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "We make corporate gifting easier with carefully curated collections and customisation options for your business.",
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyLarge
            )

            Spacer(modifier = Modifier.height(18.dp))

            val benefits = listOf(
                "Curated corporate gifting collections",
                "Personalised branding and customisation",
                "Solutions for employees and clients",
                "Thoughtful packaging and presentation",
                "Support for bulk corporate orders"
            )

            benefits.forEach { benefit ->
                Row(
                    modifier = Modifier.padding(vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "✓",
                        color = colors.primary,
                        fontWeight = FontWeight.Bold
                    )

                    Spacer(modifier = Modifier.width(12.dp))

                    Text(
                        text = benefit,
                        color = colors.onSurface,
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
            }
        }

        // Final CTA
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            EyebrowText("LET'S CREATE SOMETHING MEANINGFUL")

            Text(
                text = "Make Your Next Gift Count.",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = "Explore thoughtful gifting solutions for your organisation.",
                color = colors.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(18.dp))

            Button(
                onClick = onContactClick,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Get in Touch")
            }
        }
    }
}

@Composable
private fun AboutSection(
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 28.dp),
        content = content
    )
}

@Composable
private fun EyebrowText(text: String) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.tertiary,
        style = MaterialTheme.typography.labelMedium,
        fontWeight = FontWeight.Bold
    )

    Spacer(modifier = Modifier.height(12.dp))
}

@Composable
private fun AboutInfoCard(
    icon: @Composable () -> Unit,
    eyebrow: String,
    title: String,
    description: String
) {
    val colors = MaterialTheme.colorScheme

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = colors.surface
        )
    ) {
        Column(modifier = Modifier.padding(22.dp)) {
            icon()

            Spacer(modifier = Modifier.height(16.dp))

            EyebrowText(eyebrow)

            Text(
                text = title,
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = colors.onSurface
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = description,
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

@Composable
private fun AboutValueCard(
    icon: @Composable () -> Unit,
    title: String,
    description: String
) {
    val colors = MaterialTheme.colorScheme

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = colors.surface
        )
    ) {
        Row(
            modifier = Modifier.padding(18.dp),
            verticalAlignment = Alignment.Top
        ) {
            icon()

            Spacer(modifier = Modifier.width(16.dp))

            Column {
                Text(
                    text = title,
                    fontWeight = FontWeight.Bold,
                    color = colors.onSurface,
                    style = MaterialTheme.typography.titleMedium
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = description,
                    color = colors.onSurfaceVariant,
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}
