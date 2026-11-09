
package com.logcat.tribegreen.data.repository

import com.logcat.tribegreen.data.model.EnquiryRequest
import com.logcat.tribegreen.data.model.EnquiryResponse
import com.logcat.tribegreen.data.remote.RetrofitClient

class EnquiryRepository {

    private val apiService = RetrofitClient.apiService

    suspend fun createEnquiry(
        request: EnquiryRequest
    ): Result<EnquiryResponse> {

        return try {
            val response = apiService.createEnquiry(request)

            if (response.isSuccessful) {
                val body = response.body()

                if (body != null && body.success) {
                    Result.success(body)
                } else {
                    Result.failure(
                        Exception(body?.message ?: "Enquiry submission failed")
                    )
                }
            } else {
                val errorMessage = when (response.code()) {
                    400 -> "Please check your enquiry details."
                    500 -> "Server error. Please try again later."
                    else -> "Request failed: ${response.code()}"
                }

                Result.failure(Exception(errorMessage))
            }
        } catch (e: Exception) {
            Result.failure(
                Exception(e.message ?: "Unable to submit enquiry")
            )
        }
    }
}
