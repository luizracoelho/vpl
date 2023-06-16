import 'package:dio/dio.dart';
import 'package:vpl/environment.dart';
import 'package:vpl/features/home/models/global_search.dart';

class GlobalSearchService {
  static GlobalSearchService? _instance;

  static GlobalSearchService get instance {
    return _instance ??= GlobalSearchService();
  }

  Future<GlobalSearch?> search(String search) async {
    var dio = Dio();

    final response = await dio.get(
      '${Environment.apiUrl}/vehicles/Search?searchTerms=$search',
    );

    if (response.statusCode == 200) {
      return GlobalSearch.fromJson(response.data);
    } else {
      return null;
    }
  }
}
