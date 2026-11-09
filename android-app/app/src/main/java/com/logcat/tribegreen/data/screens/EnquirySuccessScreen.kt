package com.logcat.tribegreen.data.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun EnquirySuccessScreen(
    enquiryId: Int,
    onBackToCatalogue: () -> Unit
) {
    val colors = MaterialTheme.colorScheme

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "✓",
            style = MaterialTheme.typography.displayLarge,
            color = colors.primary
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Enquiry Submitted!",
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.Bold,
            color = colors.onBackground
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Thank you for your interest in Tribe Green.",
            style = MaterialTheme.typography.bodyLarge,
            color = colors.onSurfaceVariant
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Your Enquiry ID: #$enquiryId",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = colors.onBackground
        )

        Spacer(modifier = Modifier.height(28.dp))

        Button(
            onClick = onBackToCatalogue,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Back to Catalogue")
        }
    }
}