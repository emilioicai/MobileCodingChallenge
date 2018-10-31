//
//  SketchControlDelegate.h
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import <Foundation/Foundation.h>
#import "SPSketchPoint.h"

@class SketchControl;

@protocol SketchControlDelegate <NSObject>

@required
- (void)sketchControl:(SketchControl *)sketchControl didRecievePoint:(SPSketchPoint)point;
- (void)sketchControl:(SketchControl *)sketchControl didUndoOperationsFrom:(double)fromTimestamp to:(double)toTimestamp;
- (void)sketchControlUndoStepsDidChange:(SketchControl *)sketchControl;

@optional
- (void)sketchControl:(SketchControl *)sketchControl didRecieveBezierPath:(UIBezierPath *)path;

@end
