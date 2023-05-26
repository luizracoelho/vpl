import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vpl/features/shared/states/theme_state.dart';
import 'package:vpl/routes.dart';

import 'features/home/pages/home_page.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => ThemeState(Brightness.dark),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeState>(builder: (context, state, child) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        debugShowMaterialGrid: false,
        title: 'VPL',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.yellowAccent,
            brightness: state.brightness,
          ),
          textTheme: const TextTheme(
            bodyLarge: TextStyle(
              color: Colors.blue,
            ),
          ),
          useMaterial3: true,
        ),
        routes: routes,
        home: const HomePage(),
      );
    });
  }
}
