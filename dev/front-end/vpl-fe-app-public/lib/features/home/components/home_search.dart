import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/brands/models/brand.dart';
import 'package:vpl/features/home/states/search_state.dart';

class HomeSearch extends StatelessWidget {
  const HomeSearch({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<SearchState>(builder: (_, searchState, child) {
      if (searchState.result == null) {
        return const Text('Carregando...');
      } else {
        return searchState.result!.brands != null
            ? ListView.builder(
                itemCount: searchState.result!.brands!.length,
                itemBuilder: (_, index) {
                  final Brand brand = searchState.result!.brands![index];

                  return ListTile(
                    leading: CircleAvatar(backgroundImage: NetworkImage(brand.logo)),
                    title: Text(brand.name),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Navigator.of(context).pushNamed('/models');
                    },
                  );
                },
              )
            : Container();
      }
    });
  }
}
