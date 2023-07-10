import 'package:flutter/material.dart';

bool isIphoneLandscape(BoxConstraints constraints) => constraints.maxWidth >= 576;

bool isIpad(BoxConstraints constraints) => constraints.maxWidth >= 768;
