//
//  UIBezierPathSerialization.h
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIBezierPathSerialization : NSObject

+ (NSString *)stringFromBezierPath:(UIBezierPath *)path;
+ (UIBezierPath *)bezierPathFromString:(NSString *)string;

@end
