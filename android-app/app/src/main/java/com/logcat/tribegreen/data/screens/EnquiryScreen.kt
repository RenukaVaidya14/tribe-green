
package com.logcat.tribegreen.data.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.logcat.tribegreen.data.model.EnquiryRequest
import com.logcat.tribegreen.data.screens.viewmodel.EnquiryViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EnquiryScreen(
    productId: Int,
    onBack: () -> Unit,
    onSuccess: (Int) -> Unit,
    enquiryViewModel: EnquiryViewModel = viewModel()
) {
    var name by remember { mutableStateOf("") }
    var company by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var occasion by remember { mutableStateOf("") }
    var quantity by remember { mutableStateOf("1") }
    var budget by remember { mutableStateOf("") }
    var deliveryDate by remember { mutableStateOf("") }
    var customisations by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }

    var formError by remember { mutableStateOf<String?>(null) }

    val uiState by enquiryViewModel.uiState.collectAsStateWithLifecycle()
    val colors = MaterialTheme.colorScheme

    LaunchedEffect(uiState.isSuccess, uiState.result?.enquiry_id) {
        val enquiryId = uiState.result?.enquiry_id

        if (uiState.isSuccess && enquiryId != null) {
            enquiryViewModel.resetState()
            onSuccess(enquiryId)
        }
    }

    Scaffold(
        containerColor = colors.background,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Enquiry Form",
                        fontWeight = FontWeight.Bold,
                        color = colors.onSurface
                    )
                },
                navigationIcon = {
                    TextButton(onClick = onBack) {
                        Text(
                            text = "← Back",
                            color = colors.primary
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = colors.surface
                )
            )
        }
    ) { paddingValues ->

        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(colors.background)
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {

            Text(
                text = "Submit Your Enquiry",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                color = colors.onBackground
            )

            Text(
                text = "Fill in your details and our team will contact you.",
                style = MaterialTheme.typography.bodyMedium,
                color = colors.onSurfaceVariant
            )

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

            OutlinedTextField(
                value = company,
                onValueChange = {
                    company = it
                    formError = null
                },
                label = { Text("Company Name *") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = phone,
                onValueChange = {
                    phone = it
                    formError = null
                },
                label = { Text("Phone Number *") },
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Phone
                ),
                singleLine = true
            )

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

            OutlinedTextField(
                value = occasion,
                onValueChange = {
                    occasion = it
                    formError = null
                },
                label = { Text("Occasion *") },
                placeholder = {
                    Text("e.g. Diwali, Corporate Event")
                },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = quantity,
                onValueChange = {
                    quantity = it
                    formError = null
                },
                label = { Text("Quantity *") },
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Number
                ),
                singleLine = true
            )

            OutlinedTextField(
                value = budget,
                onValueChange = {
                    budget = it
                    formError = null
                },
                label = { Text("Budget per item *") },
                placeholder = {
                    Text("Enter budget in INR")
                },
                modifier = Modifier.fillMaxWidth(),
                keyboardOptions = KeyboardOptions(
                    keyboardType = KeyboardType.Decimal
                ),
                singleLine = true
            )

            OutlinedTextField(
                value = deliveryDate,
                onValueChange = {
                    deliveryDate = it
                    formError = null
                },
                label = { Text("Delivery Date") },
                placeholder = {
                    Text("YYYY-MM-DD")
                },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true
            )

            OutlinedTextField(
                value = customisations,
                onValueChange = {
                    customisations = it
                },
                label = { Text("Customisations") },
                placeholder = {
                    Text("e.g. Logo printing, Custom packaging")
                },
                modifier = Modifier.fillMaxWidth(),
                minLines = 2
            )

            OutlinedTextField(
                value = message,
                onValueChange = {
                    message = it
                },
                label = { Text("Additional Message") },
                modifier = Modifier.fillMaxWidth(),
                minLines = 3
            )

            val errorMessage = formError ?: uiState.error

            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = colors.error,
                    style = MaterialTheme.typography.bodyMedium
                )
            }

            Button(
                onClick = {

                    val quantityValue = quantity.trim().toIntOrNull()
                    val budgetValue = budget.trim().toDoubleOrNull()

                    // Convert 2026/11/14 into 2026-11-14
                    val formattedDate = deliveryDate
                        .trim()
                        .replace("/", "-")

                    val emailPattern =
                        Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")

                    val datePattern =
                        Regex("^\\d{4}-\\d{2}-\\d{2}$")

                    when {

                        name.trim().length < 2 -> {
                            formError = "Please enter a valid full name."
                        }

                        company.trim().length < 2 -> {
                            formError = "Please enter a valid company name."
                        }

                        phone.isBlank() -> {
                            formError = "Please enter your phone number."
                        }

                        email.isBlank() ||
                                !emailPattern.matches(email.trim()) -> {
                            formError = "Please enter a valid email address."
                        }

                        occasion.isBlank() -> {
                            formError = "Please enter an occasion."
                        }

                        quantityValue == null || quantityValue < 1 -> {
                            formError = "Please enter a valid quantity."
                        }

                        budgetValue == null ||
                                !budgetValue.isFinite() ||
                                budgetValue <= 0 -> {
                            formError = "Please enter a valid budget."
                        }

                        formattedDate.isNotEmpty() &&
                                !datePattern.matches(formattedDate) -> {
                            formError = "Please enter delivery date as YYYY-MM-DD."
                        }

                        else -> {

                            formError = null

                            val request = EnquiryRequest(
                                name = name.trim(),
                                company = company.trim(),
                                phone = phone.trim(),
                                email = email.trim(),
                                occasion = occasion.trim(),
                                quantity = quantityValue,
                                budget = budgetValue,
                                delivery_date = formattedDate
                                    .takeIf { it.isNotEmpty() },
                                customisations = customisations
                                    .split(",")
                                    .map { it.trim() }
                                    .filter { it.isNotEmpty() },
                                message = message.trim(),
                                product_ids = listOf(productId),
                                source = "Android App"
                            )

                            enquiryViewModel.submitEnquiry(request)
                        }
                    }
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                enabled = !uiState.isLoading
            ) {

                if (uiState.isLoading) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(22.dp),
                        color = colors.onPrimary,
                        strokeWidth = 2.dp
                    )
                } else {
                    Text("Submit Enquiry")
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}
