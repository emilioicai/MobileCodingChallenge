//
//  SketchControl.h
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import <UIKit/UIKit.h>
#import "SketchControlDelegate.h"

@interface SketchControl : UIView

// Reference to the current (parent) view controller
@property (nonatomic, weak) IBOutlet UIViewController * viewController;

// The delegate
@property (nonatomic, weak) IBOutlet id<SketchControlDelegate> delegate;

// The color for the line
@property (nonatomic, weak) UIColor * strokeColor;

- (void)prepare;
- (void)addBezierPath:(UIBezierPath *)path asUser:(int)userID;
- (void)addPoint:(SPSketchPoint)point;
- (void)addImage:(CGPoint)point withFrame:(CGRect)frame asUser:(int)userID;
- (IBAction)clear;
- (IBAction)undo:(id)sender;
- (IBAction)redo:(id)sender;
- (void)beginImport;
- (void)endImport;
- (void)deletePointsFrom:(double)fromTimestamp to:(double)toTimestamp;
- (void)setBackgroundImageRotation:(CGFloat)rotation translation:(CGPoint)translate scale:(CGFloat)scale;
- (void)clearAllDataFromUser:(int)userID;

@property (readonly) BOOL canUndo;
@property (readonly) BOOL canRedo;
@property (readonly) BOOL isDrawing;

@property (nonatomic, strong) UIImage * backgroundImage;

@end
