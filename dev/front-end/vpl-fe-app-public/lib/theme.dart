import 'package:flutter/material.dart';
import 'package:vpl/features/shared/states/theme_state.dart';

ThemeData getTheme(ThemeState state) {
  return ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.yellowAccent,
      brightness: state.brightness,
    ),
    textTheme: const TextTheme(
      bodyLarge: TextStyle(
        color: Colors.blue,
      ),
    ),
    useMaterial3: true,
  );
  ;
}
