// RNTMapManager.m
#import <React/RCTViewManager.h>
#import "Sketch/SketchControlUsingUIKit.h"

@interface RNTCustomViewManager : RCTViewManager
@end

@implementation RNTCustomViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  SketchControlUsingUIKit * view = [[SketchControlUsingUIKit alloc] init];
  [view prepare];
  return view;
}

@end
