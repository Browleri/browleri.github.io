# Raspberry Pi Pi-hole Server

Network-wide ad blocking and DNS filtering using **Pi-hole** on a **Raspberry Pi 3B+**.

## Overview

This project documents my home Pi-hole setup running on a Raspberry Pi 3B+.
The Raspberry Pi acts as an **always-on DNS sinkhole**, blocking ads and trackers for all devices on the local network.

The repository also serves as a foundation for future home-server and sensor projects.

## Hardware

* Raspberry Pi 3B+
* Wired Ethernet connection
* MicroSD card
* Passive cooling (recommended)

## Software

* Raspberry Pi OS (Lite)
* Pi-hole
* SSH (key-based authentication)

## Network Setup

* **Static IP:** `192.168.101.112`
* Pi-hole is configured as the primary DNS server
* DNS resolution handled by Pi-hole (`dnsmasq`)
* Router or clients configured to use Pi-hole for DNS

## Features

* Network-wide ad & tracker blocking
* DNS query logging and statistics
* Web-based admin interface
* Low power consumption
* Headless operation

## Access

* **Web Admin UI:**
  `http://192.168.101.112/admin`

* **SSH:**
  Key-based authentication enabled

  ```bash
  ssh pi@192.168.101.112
  ```

## Planned Extensions

* Indoor air quality monitoring (CO₂, temperature, humidity)
* Sensor hub for multiple rooms
* Time-series data storage and visualization
* Secure remote access

## Notes

This repository focuses on **configuration, documentation, and future experiments** rather than Pi-hole installation instructions, which are available on the official Pi-hole site.