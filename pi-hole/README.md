# Raspberry Pi Pi-hole Server

Network-wide ad blocking and DNS filtering using **Pi-hole** on a **Raspberry Pi 3B+**.

## Overview

This project documents my home **Pi-hole** setup running on a **Raspberry Pi 3B+**.

The Raspberry Pi acts as an **always-on DNS sinkhole**, blocking ads and trackers for all devices on the local network.  
The setup is designed with **durability and power-loss resilience** in mind, after experiencing SD card corruption caused by an unexpected shutdown.

The repository also serves as a foundation for future home-server and sensor projects.

---

## Hardware

* Raspberry Pi 3B+
* Wired Ethernet connection
* MicroSD card (OS only)
* USB flash drive (Pi-hole data)

---

## Software

* Raspberry Pi OS (Lite)
* Pi-hole
* log2ram
* SSH (key-based authentication)

---

## Storage & Reliability Design

This setup intentionally separates system and application data to minimise SD card wear and reduce corruption risk.

### MicroSD card
* Raspberry Pi OS (root filesystem)
* Boot partition
* Minimal write activity

### USB flash drive
* Pi-hole configuration and databases:
  * `/etc/pihole`
  * `/etc/dnsmasq.d`
* Optional backups

Pi-hole directories are **symlinked** to the USB drive so that:
- Write-heavy data is kept off the SD card
- The system can still boot if the USB drive is temporarily missing
- Recovery is fast if the SD card needs re-imaging

### Logging
* `/var/log` is mounted in **RAM** using `log2ram`
* Logs are synced to disk only at controlled times
* This dramatically reduces small, frequent writes to flash storage

---

## Network Setup

* **Static IP:** `192.168.101.112`
* Pi-hole configured as the primary DNS server
* DNS resolution handled by Pi-hole (`dnsmasq`)
* Router configured to use Pi-hole for DNS

---

## Features

* Network-wide ad & tracker blocking
* DNS query logging and statistics
* Web-based admin interface
* Low power consumption
* Headless operation
* Reduced SD card wear
* Improved resilience against sudden power loss

---

## Access

### Web Admin UI
```
http://192.168.101.112/admin
```

### SSH
Key-based authentication enabled.

```bash
ssh marttik@192.168.101.112
```

--- 

## Operational Notes

* Pi-hole CLI commands are intended to be run with sudo
* System logs are stored in RAM during runtime
* USB mounts use nofail to avoid boot failures
* In case of SD card failure:
  - Reflash Raspberry Pi OS
  - Reattach USB drive
  - Restore symlinks
  - Pi-hole configuration is preserved

## Planned Extensions

* Indoor air quality monitoring (CO₂, temperature, humidity)
* Sensor hub for multiple rooms
* Time-series data storage and visualization
* Optional LAN backups of Pi-hole configuration
* Safe shutdown / UPS integration
* Secure remote access

## Notes

This repository focuses on **configuration, documentation, and future experiments** rather than Pi-hole installation instructions, which are available on the official Pi-hole site.