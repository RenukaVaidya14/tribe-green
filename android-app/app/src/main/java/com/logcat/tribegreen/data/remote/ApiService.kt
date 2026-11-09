
package com.logcat.tribegreen.remote

import com.logcat.tribegreen.data.model.ProductResponse
import com.logcat.tribegreen.data.model.ProductDetailResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import com.logcat.tribegreen.data.model.EnquiryRequest
import com.logcat.tribegreen.data.model.EnquiryResponse
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @GET("products")
    suspend fun getProducts(): Response<ProductResponse>

    @GET("products/{id}")
    suspend fun getProductById(
        @Path("id") id: Int
    ): Response<ProductDetailResponse>

    @POST("enquiries")
    suspend fun createEnquiry(
        @Body request: EnquiryRequest
    ): Response<EnquiryResponse>
}
