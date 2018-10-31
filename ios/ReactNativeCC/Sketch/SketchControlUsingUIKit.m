//
//  SketchView.m
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

// Inspired from http://code.tutsplus.com/tutorials/ios-sdk_freehand-drawing--mobile-13164

#import "SketchControlUsingUIKit.h"
#import "SPUser.h"
#import "UIColor+Expanded.h"

#define DOT_SIZE	3.0
#define LINE_WIDTH	4.0
#define LINE_CAP_STYLE kCGLineCapRound

@implementation SketchControlUsingUIKit
{
    UIBezierPath *_path;
    UIImage *_incrementalImage;
    CGPoint _pts[5];		// to keep track of the four points of our Bezier segment
    uint _ctr;			// a counter variable to keep track of the point index
}

- (void)prepare
{
	[self setMultipleTouchEnabled:NO];
  [self setBackgroundColor:UIColor.whiteColor];
	
	_path = [UIBezierPath bezierPath];
	[self setDefaultStyleForPath:_path];
	
	self.strokeColor = UIColor.blackColor;
}

- (void)drawRect:(CGRect)rect
{
    [_incrementalImage drawInRect:rect];
	[self.strokeColor setStroke];
    [_path strokeWithBlendMode:kCGBlendModeMultiply alpha:1];
}


- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
    _ctr = 0;
    UITouch *touch = [touches anyObject];
    _pts[0] = [touch locationInView:self];
}

- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [touches anyObject];
    CGPoint p = [touch locationInView:self];
    _ctr++;
    _pts[_ctr] = p;
    if (_ctr == 4)
    {
        _pts[3] = CGPointMake((_pts[2].x + _pts[4].x)/2.0, (_pts[2].y + _pts[4].y)/2.0); // move the endpoint to the middle of the line joining the second control point of the first Bezier segment and the first control point of the second Bezier segment
		
        [_path moveToPoint:_pts[0]];
        [_path addCurveToPoint:_pts[3] controlPoint1:_pts[1] controlPoint2:_pts[2]]; // add a cubic Bezier from pt[0] to pt[3], with control points pt[1] and pt[2]
		
        [self setNeedsDisplay];
        // replace points and get ready to handle the next segment
        _pts[0] = _pts[3];
        _pts[1] = _pts[4];
        _ctr = 1;
    }
	
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event
{
	// If the user didn't move the finger, he might expect to create a small dot.
	if (_path.empty) {
		[self drawPointToBitmap:_pts[0]];
		[self.delegate sketchControl:self didRecievePoint:SPSketchPointMake(_pts[0], 1, SPSketchPointTypeDot, [SPUser currentUser].ID, [[self.strokeColor hexStringValue] UTF8String])];
	}
	else {
		[self drawBezierPathToBitmap:_path];
		[self.delegate sketchControl:self didRecieveBezierPath:_path];
	}
	
    [self setNeedsDisplay];
    [_path removeAllPoints];
    _ctr = 0;
}

- (void)touchesCancelled:(NSSet *)touches withEvent:(UIEvent *)event
{
    [self touchesEnded:touches withEvent:event];
}

- (void)drawToBitmap:(void (^)(void))handler
{
    UIGraphicsBeginImageContextWithOptions(self.bounds.size, NO, 0.0);
		
	handler();
	
    [_incrementalImage drawAtPoint:CGPointZero blendMode:kCGBlendModeMultiply alpha:1];
	
    _incrementalImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
}

- (void)drawBezierPathToBitmap:(UIBezierPath *)path {
	
	[self drawToBitmap:^{
		[self.strokeColor setStroke];
		[path stroke];
	}];

}

- (void)drawPointToBitmap:(CGPoint)point {
	
	[self drawToBitmap:^{
		CGContextRef context = UIGraphicsGetCurrentContext();
		[self.strokeColor setFill];
		CGContextFillEllipseInRect(context, CGRectMake(point.x-DOT_SIZE/2, point.y-DOT_SIZE/2, DOT_SIZE, DOT_SIZE));
	}];
	
}

- (void)addBezierPath:(UIBezierPath *)path {
	if (path.empty) return;
	[self setDefaultStyleForPath:path];
	[self drawBezierPathToBitmap:path];
	[self setNeedsDisplay];
}

- (void)setDefaultStyleForPath:(UIBezierPath *)path {
	[path setLineWidth:LINE_WIDTH];
	[path setLineCapStyle:LINE_CAP_STYLE];
}

- (void)clear {
	_incrementalImage = nil;
	[self prepare];
}

@end
