import 'package:flutter/material.dart';

class SearchState extends ChangeNotifier {
  bool open = false;

  toggle() {
    open = !open;

    notifyListeners();
  }
}
