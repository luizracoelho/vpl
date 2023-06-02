import 'package:vpl/features/referenceYears/enums/price_reference.dart';

class Evaluation {
  late int id;
  late int referenceYearId;
  late int year;
  late double value;
  late int vehicleId;
  late String vehicleName;
  late int referenceYearName;
  late PriceReference priceReference;

  Evaluation.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    referenceYearId = json['referenceYearId'];
    year = json['year'];
    value = json['value'];
    vehicleId = json['vehicleId'];
    vehicleName = json['vehicleName'];
    referenceYearName = json['referenceYearName'];
    priceReference = PriceReference.values[json['referenceYearName']];
  }
}
