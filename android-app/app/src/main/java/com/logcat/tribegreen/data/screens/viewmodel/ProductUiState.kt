
package com.logcat.tribegreen.data.screens.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.logcat.tribegreen.data.model.Product
import com.logcat.tribegreen.data.repository.ProductRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class ProductUiState(
    val isLoading: Boolean = false,
    val products: List<Product> = emptyList(),
    val error: String? = null
)

data class ProductDetailUiState(
    val isLoading: Boolean = false,
    val product: Product? = null,
    val error: String? = null
)

class ProductViewModel : ViewModel() {

    private val repository = ProductRepository()

    // Catalogue state
    private val _uiState = MutableStateFlow(ProductUiState())
    val uiState: StateFlow<ProductUiState> = _uiState.asStateFlow()

    // Product detail state
    private val _detailState = MutableStateFlow(ProductDetailUiState())
    val detailState: StateFlow<ProductDetailUiState> =
        _detailState.asStateFlow()

    // Load all products
    fun loadProducts() {
        viewModelScope.launch {
            _uiState.value = ProductUiState(isLoading = true)

            repository.getProducts()
                .onSuccess { products ->
                    _uiState.value = ProductUiState(
                        isLoading = false,
                        products = products
                    )
                }
                .onFailure { error ->
                    _uiState.value = ProductUiState(
                        isLoading = false,
                        error = error.message ?: "Something went wrong"
                    )
                }
        }
    }

    // Load individual product details
    fun loadProductById(id: Int) {
        viewModelScope.launch {
            _detailState.value = ProductDetailUiState(isLoading = true)

            repository.getProductById(id)
                .onSuccess { product ->
                    _detailState.value = ProductDetailUiState(
                        isLoading = false,
                        product = product,
                        error = if (product == null) "Product not found" else null
                    )
                }
                .onFailure { error ->
                    _detailState.value = ProductDetailUiState(
                        isLoading = false,
                        error = error.message ?: "Failed to load product"
                    )
                }
        }
    }
}
