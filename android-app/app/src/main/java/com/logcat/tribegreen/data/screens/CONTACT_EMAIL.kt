
package com.logcat.tribegreen.data.screens

import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.unit.dp

private const val CONTACT_EMAIL = "YOUR_EMAIL@example.com"
private const val WHATSAPP_NUMBER = "91XXXXXXXXXX"

@Composable
fun ContactScreen(
    onBack: () -> Unit
) {
    val colors = MaterialTheme.colorScheme
    val context = LocalContext.current

    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var company by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    var formError by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background)
            .verticalScroll(rememberScrollState())
    ) {

        // Top Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextButton(onClick = onBack) {
                Text("← Back", color = colors.primary)
            }

            Text(
                text = "Contact Us",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )
        }

        // Hero Section
        Column(
            modifier = Modifier.padding(24.dp)
        ) {
            Text(
                text = "GET IN TOUCH",
                color = colors.tertiary,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Let's Create Something Meaningful.",
                style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Have a corporate gifting requirement or a custom idea? We'd love to hear from you.",
                style = MaterialTheme.typography.bodyLarge,
                color = colors.onSurfaceVariant
            )
        }

        // Contact Information
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
        ) {
            Text(
                text = "CONTACT TRIBE GREEN",
                color = colors.tertiary,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "We'd Love to Hear From You",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Tell us what you're looking for. Our team can help you explore gifting collections and customisation options.",
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyMedium
            )

            Spacer(modifier = Modifier.height(24.dp))

            ContactInfoItem(
                title = "Email Us",
                detail = CONTACT_EMAIL
            ) {
                openEmail(context)
            }

            ContactInfoItem(
                title = "Call Us",
                detail = "Update with your official phone number"
            ) {
                Toast.makeText(
                    context,
                    "Please add your official phone number.",
                    Toast.LENGTH_SHORT
                ).show()
            }

            ContactInfoItem(
                title = "Our Location",
                detail = "Update with your business address"
            ) {
                // Add your official business address here.
            }

            Spacer(modifier = Modifier.height(12.dp))

            OutlinedButton(
                onClick = {
                    try {
                        val intent = Intent(
                            Intent.ACTION_VIEW,
                            Uri.parse("https://wa.me/$WHATSAPP_NUMBER")
                        )
                        context.startActivity(intent)
                    } catch (e: Exception) {
                        Toast.makeText(
                            context,
                            "Unable to open WhatsApp.",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Chat on WhatsApp")
            }
        }

        Spacer(modifier = Modifier.height(35.dp))

        // Contact Form
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(
                containerColor = colors.surface
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp)
            ) {
                Text(
                    text = "Send Us a Message",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = colors.onSurface
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Share your requirements with us.",
                    color = colors.onSurfaceVariant
                )

                Spacer(modifier = Modifier.height(22.dp))

                OutlinedTextField(
                    value = name,
                    onValueChange = {
                        name = it
                        formError = null
                    },
                    label = { Text("Full Name *") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = email,
                    onValueChange = {
                        email = it
                        formError = null
                    },
                    label = { Text("Email Address *") },
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Email
                    ),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = company,
                    onValueChange = { company = it },
                    label = { Text("Company Name") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = phone,
                    onValueChange = { phone = it },
                    label = { Text("Phone Number") },
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(
                        keyboardType = KeyboardType.Phone
                    ),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                OutlinedTextField(
                    value = message,
                    onValueChange = {
                        message = it
                        formError = null
                    },
                    label = { Text("Your Message *") },
                    placeholder = {
                        Text("Tell us about your gifting requirements...")
                    },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 4
                )

                if (formError != null) {
                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = formError!!,
                        color = colors.error,
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = {
                        when {
                            name.trim().length < 2 -> {
                                formError = "Please enter your full name."
                            }

                            !android.util.Patterns.EMAIL_ADDRESS
                                .matcher(email.trim()).matches() -> {
                                formError = "Please enter a valid email address."
                            }

                            message.trim().isBlank() -> {
                                formError = "Please enter your message."
                            }

                            else -> {
                                formError = null

                                val subject = Uri.encode(
                                    "Website Contact Enquiry - $name"
                                )

                                val body = Uri.encode(
                                    "Name: $name\n" +
                                    "Email: $email\n" +
                                    "Company: $company\n" +
                                    "Phone: $phone\n\n" +
                                    "Message:\n$message"
                                )

                                try {
                                    val intent = Intent(
                                        Intent.ACTION_SENDTO,
                                        Uri.parse(
                                            "mailto:$CONTACT_EMAIL?subject=$subject&body=$body"
                                        )
                                    )
                                    context.startActivity(intent)
                                } catch (e: Exception) {
                                    Toast.makeText(
                                        context,
                                        "No email application found.",
                                        Toast.LENGTH_SHORT
                                    ).show()
                                }
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp)
                ) {
                    Text(
                        text = "Send Message",
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }

        // Bottom CTA
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(28.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Thoughtful Gifting Starts Here.",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = "Let's make your next corporate gifting experience special.",
                color = colors.onSurfaceVariant
            )
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

@Composable
private fun ContactInfoItem(
    title: String,
    detail: String,
    onClick: () -> Unit
) {
    val colors = MaterialTheme.colorScheme

    Card(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp),
        colors = CardDefaults.cardColors(
            containerColor = colors.surface
        ),
        shape = RoundedCornerShape(10.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = title,
                fontWeight = FontWeight.Bold,
                color = colors.onSurface
            )

            Spacer(modifier = Modifier.height(5.dp))

            Text(
                text = detail,
                color = colors.onSurfaceVariant,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

private fun openEmail(context: android.content.Context) {
    try {
        val intent = Intent(
            Intent.ACTION_SENDTO,
            Uri.parse("mailto:$CONTACT_EMAIL")
        )
        context.startActivity(intent)
    } catch (e: Exception) {
        Toast.makeText(
            context,
            "No email application found.",
            Toast.LENGTH_SHORT
        ).show()
    }
}
