/*
 * Copyright (C) 2014 Roman Beránek
 *
 * This source code is maintained under a proprietary license of the
 * GINA Software s.r.o. company. If you are not its employee, you
 * should not even see these words and the guy who is responsible
 * for making you an access to this file will be punished. And he
 * or she will be punished hard.
 *
 * The main reason of this is that I'm a shitty Objective-C programmer
 * so I don't want anyone to read this bloody code except the people
 * I need to show my work to (in order to get my money).
 *
 */

#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVJSON.h>

#import <UIKit/UIKit.h>
#import <UIKit/UIDevice.h>

#import "AppDelegate.h"

@interface GinaPlugin : CDVPlugin {
    UIDevice *currentDevice;
}

@property (nonatomic, retain) UIDevice *currentDevice;

// "IMEI" - in fact it will be the identifierForVendor
-(void) getIMEI: (CDVInvokedUrlCommand*)command;
-(void) doNavigate: (CDVInvokedUrlCommand*)command;
/*
-(int) getBatteryLevel: (CDVInvokedUrlCommand*)command;
-(void) playInputClick: (CDVInvokedUrlCommand*)command;
-(bool) isThisPhone: (CDVInvokedUrlCommand*)command;
 */

@end