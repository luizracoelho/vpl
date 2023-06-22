import 'package:flutter/material.dart';
import 'package:vpl/features/home/models/global_search.dart';
import 'package:vpl/features/home/services/global_search_service.dart';

class SearchState extends ChangeNotifier {
  bool open = false;
  TextEditingController searchController = TextEditingController();
  bool isSearching = false;
  GlobalSearch? result;

  toggleSearchBar() {
    open = !open;

    if (!open) {
      searchController.clear();
      isSearching = false;
      result = null;
    }

    notifyListeners();
  }

  clear() {
    searchController.clear();
    isSearching = false;
    result = null;

    notifyListeners();
  }

  Future<void> search() async {
    if (searchController.text.isNotEmpty) {
      isSearching = true;

      notifyListeners();

      result = await GlobalSearchService.instance.search(searchController.text);

      notifyListeners();
    }
  }
}
