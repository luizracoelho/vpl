import 'package:flutter/material.dart';
import 'package:vpl/features/shared/states/theme_state.dart';

ThemeData getTheme(ThemeState state) {
  return ThemeData(
    canvasColor: Colors.yellow,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.yellowAccent,
      // surface: Colors.yellow.shade800,
      brightness: state.brightness,
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(
        color: Colors.yellow,
      ),
    ),
    useMaterial3: true,
  );
  ;
}
