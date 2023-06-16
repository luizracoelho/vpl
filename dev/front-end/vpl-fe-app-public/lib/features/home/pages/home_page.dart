import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/home/components/home_content.dart';
import 'package:vpl/features/home/components/home_search.dart';
import 'package:vpl/features/home/states/search_state.dart';
import 'package:vpl/features/shared/components/drawer/vpl_drawer.dart';
import 'package:vpl/features/shared/states/theme_state.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<SearchState>(builder: (context, searchState, child) {
      return Scaffold(
        appBar: AppBar(
          title: searchState.open
              ? TextField(
                  controller: searchState.searchController,
                  autofocus: true,
                  decoration: const InputDecoration(
                    hintText: 'Digite sua pesquisa...',
                  ),
                  onSubmitted: (_) {
                    searchState.search();
                  },
                )
              : const Text('VPL Home'),
          actions: [
            Row(
              children: [
                Visibility(
                  visible: !searchState.open,
                  child: Consumer<ThemeState>(builder: (context, state, child) {
                    return IconButton(
                      onPressed: () => state.toggleTheme(),
                      icon: Icon(state.icon),
                    );
                  }),
                ),
                IconButton(
                  onPressed: () => searchState.toggleSearchBar(),
                  icon: Icon(
                    searchState.searchController.text.isEmpty ? Icons.search_outlined : Icons.search_off_outlined,
                  ),
                ),
              ],
            ),
          ],
        ),
        drawer: const VplDrawer(),
        body: SafeArea(
          child: !searchState.isSearching ? const HomeContent() : const HomeSearch(),
        ),
      );
    });
  }
}
