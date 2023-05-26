import 'package:flutter/material.dart';

class ThemeState extends ChangeNotifier {
  Brightness brightness;
  late IconData icon;

  ThemeState(this.brightness) {
    _toggleIcon();
  }

  void _toggleIcon() {
    icon = brightness == Brightness.dark ? Icons.dark_mode : Icons.light_mode;
  }

  void toggleTheme() {
    brightness = brightness == Brightness.dark ? Brightness.light : Brightness.dark;
    _toggleIcon();

    notifyListeners();
  }
}
