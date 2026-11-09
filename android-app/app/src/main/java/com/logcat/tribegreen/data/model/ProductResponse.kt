
package com.logcat.tribegreen.data.model

data class ProductResponse(
    val success: Boolean,
    val count: Int,
    val data: List<Product>
)

data class Product(
    val id: Int,
    val name: String,
    val image_url: String?,
    val category: String?,
    val description: String?,
    val min_price: String?,
    val max_price: String?,
    val occasions: List<String>?,
    val customisations: List<String>?
)

data class ProductDetailResponse(
    val success: Boolean,
    val data: Product
)
