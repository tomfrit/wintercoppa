<?php

/**
 * ProcessWire Configuration File
 *
 * Site-specific configuration for ProcessWire
 *
 * Please see the file /wire/config.php which contains all configuration options you may
 * specify here. Simply copy any of the configuration options from that file and paste
 * them into this file in order to modify them.
 * 
 * SECURITY NOTICE
 * In non-dedicated environments, you should lock down the permissions of this file so
 * that it cannot be seen by other users on the system. For more information, please
 * see the config.php section at: https://processwire.com/docs/security/file-permissions/
 *
 * ProcessWire 2.x
 * Copyright (C) 2015 by Ryan Cramer
 * This file licensed under Mozilla Public License v2.0 (http://mozilla.org/MPL/2.0/)
 *
 * https://processwire.com
 *
 */

if(!defined("PROCESSWIRE")) die();

/*** SITE CONFIG *************************************************************************/

/**
 * Enable debug mode?
 *
 * Debug mode causes additional info to appear for use during dev and debugging.
 * This is almost always recommended for sites in development. However, you should
 * always have this disabled for live/production sites.
 *
 * @var bool
 *
 */
$config->debug = false;


/*** INSTALLER CONFIG ********************************************************************/


/**
 * Installer: Database Configuration
 * 
 */
$config->dbHost = 'localhost';
$config->dbName = 'wintercoppa';
$config->dbUser = 'root';
$config->dbPass = 'nichts';
$config->dbPort = '3306';

/**
 * Installer: User Authentication Salt 
 * 
 * Must be retained if you migrate your site from one server to another
 * 
 */
$config->userAuthSalt = '1e5c637663e13c55505ccde37f051d10'; 

/**
 * Installer: File Permission Configuration
 * 
 */
$config->chmodDir = '0777'; // permission for directories created by ProcessWire
$config->chmodFile = '0666'; // permission for files created by ProcessWire 

/**
 * Installer: Time zone setting
 * 
 */
$config->timezone = 'Europe/Berlin';


/**
 * Installer: HTTP Hosts Whitelist
 * 
 */
$config->httpHosts = array('wintercoppa', 'wintercoppa.enizehates.de');

