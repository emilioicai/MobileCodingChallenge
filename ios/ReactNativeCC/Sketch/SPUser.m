//
//  SPUser.m
//
//  Created by Jonathan Wehlte.
//  Copyright (c). Some rights reserved.
//

#import "SPUser.h"

static SPUser * __currentUser = nil;

@implementation SPUser 

+ (instancetype)currentUser;
{
	if (!__currentUser) [self authentificate];
	return __currentUser;
}

+ (void)authentificate;
{
  if (__currentUser != nil) return;

  __currentUser = [[SPUser alloc] init];
	__currentUser.ID = 1;
}

@end
