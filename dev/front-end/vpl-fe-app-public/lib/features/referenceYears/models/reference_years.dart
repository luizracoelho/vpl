import '../enums/price_reference.dart';

class ReferenceYear {
  late int? id;
  late int? year;
  late PriceReference? priceReference;

  ReferenceYear({this.id, this.year, this.priceReference});

  factory ReferenceYear.fromJson(Map<String, dynamic> json) {
    return ReferenceYear(
      id: json['id'] as int?,
      year: json['year'] as int?,
      priceReference: json['priceReference'] != null
          ? PriceReference.values.firstWhere(
              (e) => e.toString() == 'PriceReference.${json['priceReference']}')
          : null,
    );
  }
}
