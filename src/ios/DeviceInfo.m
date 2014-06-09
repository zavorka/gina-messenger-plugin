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

#import "DeviceInfo.h"


@implementation DeviceInfo

@synthesize currentDevice;

-(CDVPlugin*) initWithWebView:(UIWebView*) theWebView
{
    self = (DeviceInfo*)[super initWithWebView:theWebView];
    
    if (self) {
        currentDevice = [UIDevice currentDevice];
    }
    
    return self;
}

-(void) getIMEI:(CDVInvokedUrlCommand*)command {
    NSUUID *id = [currentDevice identifierForVendor];
    
    CDVPluginResult* pluginResult;
    
    if (id != NULL) {
        //pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[id UUIDString]];
        // as the ID keeps changing with every new instance of iPhone Simulator, we want to keep a constant one for testing
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"80EA5A3B-7BB1-4EF6-AB53-8A72EF37"];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT];
    }
    
    NSLog(@"identifierForVendor is %@", [id UUIDString]);
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}



@end

