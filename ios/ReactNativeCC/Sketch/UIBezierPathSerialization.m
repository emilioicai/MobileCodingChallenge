//
//  UIBezierPathSerialization.m
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

// Inspired by http://www.mlsite.net/blog/?p=1312

#import "UIBezierPathSerialization.h"

static void saveApplier(void* info, const CGPathElement* element)
{
	NSMutableArray* a = (__bridge NSMutableArray*) info;
	
	int nPoints;
	switch (element->type)
	{
		case kCGPathElementMoveToPoint:
			nPoints = 1;
			break;
		case kCGPathElementAddLineToPoint:
			nPoints = 1;
			break;
		case kCGPathElementAddQuadCurveToPoint:
			nPoints = 2;
			break;
		case kCGPathElementAddCurveToPoint:
			nPoints = 3;
			break;
		case kCGPathElementCloseSubpath:
			nPoints = 0;
			break;
		default:
			[a replaceObjectAtIndex:0 withObject:[NSNumber numberWithBool:NO]];
			return;
	}
	
	NSNumber* type = [NSNumber numberWithInt:element->type];
	NSMutableArray * points = @[].mutableCopy;
	for (int i = 0; i < nPoints; i++) {
		[points addObject:[NSNumber numberWithFloat:element->points[i].x]];
		[points addObject:[NSNumber numberWithFloat:element->points[i].y]];
	}
	[a addObject:[NSDictionary dictionaryWithObjectsAndKeys:type,@"type",points,@"points",nil]];
}


@implementation UIBezierPathSerialization

+ (NSString *)stringFromBezierPath:(UIBezierPath *)path {
	// Convert path to an array
	NSMutableArray* a = @[].mutableCopy;
	CGPathApply(path.CGPath, (__bridge void *)(a), saveApplier);

	NSData * jsonData = [NSJSONSerialization dataWithJSONObject:a options:0 error:nil];
	return [NSString.alloc initWithData:jsonData encoding:NSUTF8StringEncoding];
}

+ (UIBezierPath *)bezierPathFromString:(NSString *)string {
	NSArray* a = [NSJSONSerialization JSONObjectWithData:[string dataUsingEncoding:NSUTF8StringEncoding] options:0 error:nil];
	
	if (![a isKindOfClass:[NSArray class]]) return nil;
	
	// Recreate (and store) path
	CGMutablePathRef p = CGPathCreateMutable();
	for (NSInteger i = 0, l = [a count]; i < l; i++)
	{
		NSDictionary* d = [a objectAtIndex:i];
		
		NSArray * points = [d objectForKey:@"points"];
		
		switch ([[d objectForKey:@"type"] intValue])
		{
			case kCGPathElementMoveToPoint:
				CGPathMoveToPoint(p, NULL, [points[0] floatValue], [points[1] floatValue]);
				break;
			case kCGPathElementAddLineToPoint:
				CGPathAddLineToPoint(p, NULL, [points[0] floatValue], [points[1] floatValue]);
				break;
			case kCGPathElementAddQuadCurveToPoint:
				CGPathAddQuadCurveToPoint(p, NULL, [points[0] floatValue], [points[1] floatValue], [points[2] floatValue], [points[3] floatValue]);
				break;
			case kCGPathElementAddCurveToPoint:
				CGPathAddCurveToPoint(p, NULL, [points[0] floatValue], [points[1] floatValue], [points[2] floatValue], [points[3] floatValue], [points[4] floatValue], [points[5] floatValue]);
				break;
			case kCGPathElementCloseSubpath:
				CGPathCloseSubpath(p);
				break;
			default:
				CGPathRelease(p);
				return NO;
		}
	}
	UIBezierPath * path = [UIBezierPath bezierPathWithCGPath:p];
	CGPathRelease(p);

	return path;
}

@end
