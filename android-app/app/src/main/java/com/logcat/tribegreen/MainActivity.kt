
package com.logcat.tribegreen

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument

import com.logcat.tribegreen.data.screens.AboutScreen
import com.logcat.tribegreen.data.screens.CatalogueScreen
import com.logcat.tribegreen.data.screens.ContactScreen
import com.logcat.tribegreen.data.screens.EnquiryScreen
import com.logcat.tribegreen.data.screens.EnquirySuccessScreen
import com.logcat.tribegreen.data.screens.HomeScreen
import com.logcat.tribegreen.data.screens.ProductDetailsScreen

import com.logcat.tribegreen.ui.theme.TribeGreenTheme

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        setContent {
            TribeGreenTheme {

                val navController = rememberNavController()

                Surface(
                    modifier = Modifier.fillMaxSize()
                ) {

                    NavHost(
                        navController = navController,
                        startDestination = "home"
                    ) {

                        // HOME SCREEN
                        composable("home") {

                            HomeScreen(
                                onExploreCollection = {
                                    navController.navigate("catalogue")
                                },

                                onRequestProposal = {
                                    navController.navigate("catalogue")
                                },

                                onAboutClick = {
                                    navController.navigate("about")
                                },

                                onContactClick = {
                                    navController.navigate("contact")
                                }
                            )
                        }

                        // PRODUCT CATALOGUE
                        composable("catalogue") {

                            CatalogueScreen(
                                onProductClick = { productId ->
                                    navController.navigate(
                                        "product_details/$productId"
                                    )
                                }
                            )
                        }

                        // PRODUCT DETAILS
                        composable(
                            route = "product_details/{productId}",
                            arguments = listOf(
                                navArgument("productId") {
                                    type = NavType.IntType
                                }
                            )
                        ) { backStackEntry ->

                            val productId =
                                backStackEntry.arguments?.getInt("productId") ?: 0

                            ProductDetailsScreen(
                                productId = productId,

                                onBack = {
                                    navController.popBackStack()
                                },

                                onEnquireNow = {
                                    navController.navigate(
                                        "enquiry/$productId"
                                    )
                                }
                            )
                        }

                        // ENQUIRY FORM
                        composable(
                            route = "enquiry/{productId}",
                            arguments = listOf(
                                navArgument("productId") {
                                    type = NavType.IntType
                                }
                            )
                        ) { backStackEntry ->

                            val productId =
                                backStackEntry.arguments?.getInt("productId") ?: 0

                            EnquiryScreen(
                                productId = productId,

                                onBack = {
                                    navController.popBackStack()
                                },

                                onSuccess = { enquiryId ->

                                    navController.navigate(
                                        "enquiry_success/$enquiryId"
                                    ) {
                                        popUpTo("home") {
                                            inclusive = false
                                        }
                                    }
                                }
                            )
                        }

                        // ENQUIRY SUCCESS
                        composable(
                            route = "enquiry_success/{enquiryId}",
                            arguments = listOf(
                                navArgument("enquiryId") {
                                    type = NavType.IntType
                                }
                            )
                        ) { backStackEntry ->

                            val enquiryId =
                                backStackEntry.arguments?.getInt("enquiryId") ?: 0

                            EnquirySuccessScreen(
                                enquiryId = enquiryId,

                                onBackToCatalogue = {
                                    navController.navigate("home") {
                                        popUpTo("home") {
                                            inclusive = true
                                        }
                                    }
                                }
                            )
                        }

                        // ABOUT US SCREEN
                        composable("about") {

                            AboutScreen(
                                onExploreCollection = {
                                    navController.navigate("catalogue")
                                },

                                onContactClick = {
                                    navController.navigate("contact")
                                }
                            )
                        }

                        // CONTACT SCREEN
                        composable("contact") {

                            ContactScreen(
                                onBack = {
                                    navController.popBackStack()
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
