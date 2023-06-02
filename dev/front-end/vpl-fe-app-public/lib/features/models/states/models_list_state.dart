import 'package:flutter/material.dart';
import 'package:vpl/features/brands/models/brand.dart';
import '../models/model.dart';
import '../service/model_service.dart';

class ModelsListState extends ChangeNotifier {
  List<Model>? models;

  Future<void> listModels() async {
    models = await ModelService.instance.list();
  }

  Future<void> listModelsByBrand(int brandId) async {
    models = await ModelService.instance.listByBrand(brandId);
  }

  void refresh() {
    notifyListeners();
  }
}
