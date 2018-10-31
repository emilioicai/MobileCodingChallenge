//
//  SPUser.h
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import <Foundation/Foundation.h>

@interface SPUser : NSObject

@property int ID;

+ (instancetype)currentUser;
+ (void)authentificate;

@end
