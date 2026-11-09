
package com.logcat.tribegreen.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
private val TribeGreenDarkColorScheme = darkColorScheme(
    primary = WarmAccent,
    onPrimary = DarkForest,

    secondary = LightForest,
    onSecondary = PureWhite,

    tertiary = WarmIvory,
    onTertiary = DarkForest,

    background = DarkForest,
    onBackground = TextLight,

    surface = Color(0xFF19251E),
    onSurface = TextLight,

    surfaceVariant = Color(0xFF29382E),
    onSurfaceVariant = MutedLight,

    outline = BorderDark,

    error = ErrorRed,
    onError = PureWhite
)

private val TribeGreenLightColorScheme = lightColorScheme(
    primary = ForestGreen,
    onPrimary = PureWhite,

    secondary = LightForest,
    onSecondary = PureWhite,

    tertiary = WarmAccent,
    onTertiary = DarkForest,

    background = WarmIvory,
    onBackground = TextDark,

    surface = PureWhite,
    onSurface = TextDark,

    surfaceVariant = Color(0xFFECEDE5),
    onSurfaceVariant = MutedDark,

    outline = BorderLight,

    error = ErrorRed,
    onError = PureWhite
)

@Composable
fun TribeGreenTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {

    val colorScheme = if (darkTheme) {
        TribeGreenDarkColorScheme
    } else {
        TribeGreenLightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
