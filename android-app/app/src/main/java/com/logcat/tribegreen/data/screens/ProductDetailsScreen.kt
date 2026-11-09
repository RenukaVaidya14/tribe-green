package com.logcat.tribegreen.data.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.logcat.tribegreen.data.screens.viewmodel.ProductViewModel

private const val IMAGE_BASE_URL = "http://10.42.142.145:5000"

@Composable
fun ProductDetailsScreen(
    productId: Int,
    onBack: () -> Unit,
    onEnquireNow: () -> Unit,
    viewModel: ProductViewModel = viewModel()
) {
    val state by viewModel.detailState.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val colors = MaterialTheme.colorScheme

    LaunchedEffect(productId) {
        viewModel.loadProductById(productId)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background)
    ) {

        // Top Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextButton(onClick = onBack) {
                Text(
                    text = "← Back",
                    color = colors.primary
                )
            }

            Text(
                text = "Product Details",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )
        }

        when {
            // Loading
            state.isLoading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(
                        color = colors.primary
                    )
                }
            }

            // Error
            state.error != null -> {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = state.error ?: "Unable to load product",
                        color = colors.error
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = {
                            viewModel.loadProductById(productId)
                        }
                    ) {
                        Text("Try Again")
                    }
                }
            }

            // Product Details
            state.product != null -> {
                val product = state.product!!

                val imageUrl = product.image_url?.let { imagePath ->
                    "$IMAGE_BASE_URL${
                        if (imagePath.startsWith("/")) {
                            imagePath
                        } else {
                            "/$imagePath"
                        }
                    }"
                }

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState())
                ) {

                    // Product Image
                    AsyncImage(
                        model = ImageRequest.Builder(context)
                            .data(imageUrl)
                            .crossfade(true)
                            .build(),
                        contentDescription = product.name,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(280.dp),
                        contentScale = ContentScale.Crop
                    )

                    Column(
                        modifier = Modifier.padding(20.dp)
                    ) {

                        // Category
                        Text(
                            text = product.category ?: "Collection",
                            color = colors.tertiary,
                            style = MaterialTheme.typography.labelLarge
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        // Product Name
                        Text(
                            text = product.name,
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold,
                            color = colors.onBackground
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        // Description
                        Text(
                            text = product.description ?: "",
                            style = MaterialTheme.typography.bodyLarge,
                            color = colors.onSurfaceVariant
                        )

                        Spacer(modifier = Modifier.height(20.dp))

                        // Price Heading
                        Text(
                            text = "Price Range",
                            fontWeight = FontWeight.Bold,
                            color = colors.onBackground
                        )

                        Spacer(modifier = Modifier.height(6.dp))

                        // Price
                        Text(
                            text = "₹${product.min_price ?: "—"} – ₹${product.max_price ?: "—"}",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = colors.primary
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        // Occasions
                        Text(
                            text = "Occasions",
                            fontWeight = FontWeight.Bold,
                            color = colors.onBackground
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = product.occasions
                                ?.takeIf { it.isNotEmpty() }
                                ?.joinToString(", ")
                                ?: "No occasions available",
                            color = colors.onSurfaceVariant
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        // Customisations
                        Text(
                            text = "Customisations",
                            fontWeight = FontWeight.Bold,
                            color = colors.onBackground
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = product.customisations
                                ?.takeIf { it.isNotEmpty() }
                                ?.joinToString(", ")
                                ?: "No customisations available",
                            color = colors.onSurfaceVariant
                        )

                        Spacer(modifier = Modifier.height(30.dp))

                        // Enquire Now Button
                        Button(
                            onClick = onEnquireNow,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(52.dp),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text(
                                text = "Enquire Now",
                                fontWeight = FontWeight.SemiBold
                            )
                        }

                        Spacer(modifier = Modifier.height(20.dp))
                    }
                }
            }
        }
    }
}