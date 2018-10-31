//
//  SPSketchPoint.h
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import <UIKit/UIKit.h>

typedef enum : NSUInteger {
	SPSketchPointTypeBetween = 0,
    SPSketchPointTypeStart = 1,
    SPSketchPointTypeEnd = 2,
    SPSketchPointTypeDot = 3,
	
	SPSketchPointTypeBetweenCalc = 1000
} SPSketchPointType;

struct SPSketchPoint {
	CGPoint position;
	CGFloat size;
	SPSketchPointType type;
	double timestamp;
	int userID;
	char colorHex[10]; // property only defined on SPSketchPointTypeStart
};
typedef struct SPSketchPoint SPSketchPoint;

SPSketchPoint SPSketchPointMake(CGPoint position, CGFloat size, SPSketchPointType type, int userID, const char * colorHex);
SPSketchPoint SPSketchPointMakeOrRestore(CGPoint position, CGFloat size, SPSketchPointType type, int userID, const char * colorHex, double timestamp);

NSString * NSStringFromSPSketchPoint(SPSketchPoint point);
NSDictionary * NSDictionaryFromSPSketchPoint(SPSketchPoint point);
SPSketchPoint SPSketchPointFromDictionary(NSDictionary * dict);
NSValue * NSValueFromSPSketchPoint(SPSketchPoint point);
SPSketchPoint SPSketchPointFromValue(NSValue * value);
