
package com.logcat.tribegreen.data.repository

import com.logcat.tribegreen.data.model.Product
import com.logcat.tribegreen.data.remote.RetrofitClient

class ProductRepository {

    private val apiService = RetrofitClient.apiService

    suspend fun getProducts(): Result<List<Product>> {
        return try {
            val response = apiService.getProducts()

            if (response.isSuccessful) {
                val products = response.body()?.data ?: emptyList()
                Result.success(products)
            } else {
                Result.failure(
                    Exception("Failed to load products: ${response.code()}")
                )
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getProductById(id: Int): Result<Product?> {
        return try {
            val response = apiService.getProductById(id)

            if (response.isSuccessful) {
                Result.success(response.body()?.data)
            } else {
                Result.failure(
                    Exception("Failed to load product: ${response.code()}")
                )
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
