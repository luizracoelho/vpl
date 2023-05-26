import 'package:flutter/material.dart';
import 'package:vpl/features/brands/models/brand.dart';

import '../service/brand_service.dart';

class BrandsListState extends ChangeNotifier {
  List<Brand>? brands;

  Future<void> listBrands() async {
    brands = await BrandService.instance.list();
  }

  void refresh() {
    notifyListeners();
  }
}
