import 'package:dio/dio.dart';
import 'package:vpl/environment.dart';

import '../models/reference_years.dart';

class ReferenceYearService {
  static ReferenceYearService? _instance;

  static ReferenceYearService get instance {
    return _instance ??= ReferenceYearService();
  }

  Future<List<ReferenceYear>?> list() async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/referenceYears',
    );

    List<ReferenceYear> ReferenceYears = [];

    if (response.statusCode == 200) {
      for (var item in response.data) {
        ReferenceYears.add(ReferenceYear.fromJson(item));
      }

      return ReferenceYears;
    } else {
      return null;
    }
  }
}
