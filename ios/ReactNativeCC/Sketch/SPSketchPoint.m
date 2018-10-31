//
//  SPSketchPoint.m
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import "SPSketchPoint.h"
//#import "UIColor+Expanded.h"
#define NSNumberFromFloat(x) [NSNumber numberWithFloat:x]
#define NSNumberFromDouble(x) [NSNumber numberWithDouble:x]
#define NSNumberFromLong(x) [NSNumber numberWithLong:x]
#define NSNumberFromInt(x) [NSNumber numberWithInt:x]

static double timeOffset = 0;

double SPSketchPointCreateTimestamp() {
	double currentTime = CACurrentMediaTime();
	if (!timeOffset) { timeOffset = NSDate.date.timeIntervalSince1970 - currentTime; }
	return timeOffset + currentTime;
}

SPSketchPoint SPSketchPointMakeOrRestore(CGPoint position, CGFloat size, SPSketchPointType type, int userID, const char * colorHex, double timestamp)
{
	SPSketchPoint p;
	p.position = position;
	p.size = size;
	p.type = type;
	if (timestamp == 0) timestamp = SPSketchPointCreateTimestamp();
	p.timestamp = timestamp;
	p.userID = userID;
	//if (type == SPSketchPointTypeStart) {
	if (colorHex && colorHex[0] != 0) {
		strcpy(p.colorHex, colorHex);
	}
	//}
	else p.colorHex[0] = 0;
	return p;
}

SPSketchPoint SPSketchPointMake(CGPoint position, CGFloat size, SPSketchPointType type, int userID, const char * colorHex)
{
	return SPSketchPointMakeOrRestore(position, size, type, userID, colorHex, 0);
}

static NSString * NSStringFromSPSketchPointType(SPSketchPointType type) {
	switch (type) {
		case SPSketchPointTypeDot:
			return @"SPSketchPointTypeDot";
			break;
		case SPSketchPointTypeEnd:
			return @"SPSketchPointTypeEnd";
			break;
		case SPSketchPointTypeStart:
			return @"SPSketchPointTypeStart";
			break;
		case SPSketchPointTypeBetween:
			return @"SPSketchPointTypeBetween";
			break;
		case SPSketchPointTypeBetweenCalc:
			return @"SPSketchPointTypeBetweenCalc";
			break;
		default:
			break;
	}
}

NSString * NSStringFromSPSketchPoint(SPSketchPoint point)
{
	return [NSString stringWithFormat:@"%@ { position: %@, size: %f, time: %f, user: %d }",
			NSStringFromSPSketchPointType(point.type),
			NSStringFromCGPoint(point.position),
			point.size,
			point.timestamp,
			point.userID];
}

NSString * NSStringFromSPSketchPointColor(const char * hex) {
	if (!hex || !hex[0]) return @"000000";
	return [NSString stringWithCString:hex encoding:NSUTF8StringEncoding];
}


NSDictionary * NSDictionaryFromSPSketchPoint(SPSketchPoint point)
{
	return @{
			 @"x": NSNumberFromFloat(point.position.x),
			 @"y": NSNumberFromFloat(point.position.y),
			 @"ts": NSNumberFromDouble(point.timestamp),
			 @"s": NSNumberFromFloat(point.size),
			 @"t": NSNumberFromInt(point.type),
			 @"u": NSNumberFromInt(point.userID),
			 @"c": (point.type == SPSketchPointTypeStart) ? NSStringFromSPSketchPointColor(point.colorHex) : @0
			 };
}

SPSketchPoint SPSketchPointFromDictionary(NSDictionary * dict)
{
	SPSketchPoint p;
	p.position = CGPointMake([[dict objectForKey:@"x"] floatValue], [[dict objectForKey:@"y"] floatValue]);
	p.timestamp = [[dict objectForKey:@"ts"] doubleValue];
	p.size = [[dict objectForKey:@"s"] floatValue];
	p.type = [[dict objectForKey:@"t"] intValue];
	p.userID = [[dict objectForKey:@"u"] intValue];
	if (p.type == SPSketchPointTypeStart) {//[[dict objectForKey:@"c"] boolValue]
		//UIColor * color = [UIColor colorWithHexString:[dict objectForKey:@"c"]];
		//p.color = color.CGColor;
		strcpy(p.colorHex, [[dict objectForKey:@"c"] UTF8String]);
	}
	return p;
}

NSValue * NSValueFromSPSketchPoint(SPSketchPoint point)
{
	NSValue * value = [NSValue value:&point withObjCType:@encode(SPSketchPoint)];
	return value;
}

SPSketchPoint SPSketchPointFromValue(NSValue * value)
{
	SPSketchPoint point;
	[value getValue:&point];
	return point;
}
