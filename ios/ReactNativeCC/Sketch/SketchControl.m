//
//  SketchControl.m
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import "SketchControl.h"

@implementation SketchControl

- (void)prepare
{}

- (void)addBezierPath:(UIBezierPath *)path asUser:(int)userID
{}

- (void)addPoint:(SPSketchPoint)point
{}

- (void)addImage:(CGPoint)point withFrame:(CGRect)frame asUser:(int)userID
{}

- (void)clear
{}

- (void)undo:(id)sender
{}

- (void)redo:(id)sender
{}

- (void)beginImport;
{}

- (void)endImport;
{}

- (void)deletePointsFrom:(double)fromTimestamp to:(double)toTimestamp
{}

- (BOOL)canUndo
{
	return NO;
}

- (BOOL)canRedo
{
	return NO;
}

- (void)setBackgroundImageRotation:(CGFloat)rotation translation:(CGPoint)translate scale:(CGFloat)scale
{
}

- (void)clearAllDataFromUser:(int)userID;
{}

@end
