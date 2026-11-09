
package com.logcat.tribegreen.data.screens.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.logcat.tribegreen.data.model.EnquiryRequest
import com.logcat.tribegreen.data.model.EnquiryResult
import com.logcat.tribegreen.data.repository.EnquiryRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class EnquiryUiState(
    val isLoading: Boolean = false,
    val isSuccess: Boolean = false,
    val result: EnquiryResult? = null,
    val error: String? = null
)

class EnquiryViewModel : ViewModel() {

    private val repository = EnquiryRepository()

    private val _uiState = MutableStateFlow(EnquiryUiState())
    val uiState: StateFlow<EnquiryUiState> = _uiState.asStateFlow()

    fun submitEnquiry(request: EnquiryRequest) {
        if (_uiState.value.isLoading) return

        viewModelScope.launch {
            _uiState.value = EnquiryUiState(isLoading = true)

            repository.createEnquiry(request)
                .onSuccess { response ->
                    _uiState.value = EnquiryUiState(
                        isSuccess = true,
                        result = response.data
                    )
                }
                .onFailure { error ->
                    _uiState.value = EnquiryUiState(
                        error = error.message
                            ?: "Unable to submit enquiry"
                    )
                }
        }
    }

    fun resetState() {
        _uiState.value = EnquiryUiState()
    }
}
