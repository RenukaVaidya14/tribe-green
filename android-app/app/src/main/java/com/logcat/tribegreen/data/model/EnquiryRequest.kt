
package com.logcat.tribegreen.data.model

data class EnquiryRequest(
    val name: String,
    val company: String,
    val phone: String,
    val email: String,
    val occasion: String,
    val quantity: Int,
    val budget: Double,
    val delivery_date: String? = null,
    val customisations: List<String> = emptyList(),
    val message: String = "",
    val product_ids: List<Int>,
    val source: String = "Android App"
)

data class EnquiryResponse(
    val success: Boolean,
    val message: String,
    val data: EnquiryResult?
)

data class EnquiryResult(
    val enquiry_id: Int,
    val status: String,
    val source: String
)
