import 'package:flutter/material.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';
import 'package:vpl/features/referenceYears/models/reference_years.dart';
import 'package:vpl/features/referenceYears/service/reference_years_service.dart';

class ReferenceYearsListState extends ChangeNotifier {
  List<ReferenceYear>? referencesYears;

  Future<void> listReferenceYears(PriceReference priceReference) async {
    referencesYears = await ReferenceYearsService.instance.list(priceReference);
  }

  void refresh() {
    notifyListeners();
  }
}
