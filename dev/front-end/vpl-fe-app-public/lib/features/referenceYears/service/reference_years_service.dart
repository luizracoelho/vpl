import 'package:dio/dio.dart';
import 'package:vpl/environment.dart';
import 'package:vpl/features/referenceYears/enums/price_reference.dart';

import '../models/reference_years.dart';

class ReferenceYearsService {
  static ReferenceYearsService? _instance;

  static ReferenceYearsService get instance {
    return _instance ??= ReferenceYearsService();
  }

  Future<List<ReferenceYear>?> list(PriceReference priceReference) async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/prices/referenceYears/priceReference/${priceReference.value}',
    );

    List<ReferenceYear> referenceYears = [];

    if (response.statusCode == 200) {
      for (var item in response.data) {
        referenceYears.add(ReferenceYear.fromJson(item));
      }

      return referenceYears;
    } else {
      return null;
    }
  }
}
