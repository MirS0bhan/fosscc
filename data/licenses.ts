import type { License } from "@/types/license"

export const licenses: License[] = [
  // Software licenses
  {
    id: "mit",
    name: "MIT License",
    spdxId: "MIT",
    category: "software",
    tags: ["سهیل‌گیر", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://opensource.org/licenses/MIT",
    summaryFa: "پروانه بسیار سهیل و سهیل‌گیر که تنها الزام نسبت‌دهی دارد",
    templatePlaceholders: ["year", "author"],
    template: `MIT License

Copyright (c) {{year}} {{author}}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "apache-2.0",
    name: "Apache License 2.0",
    spdxId: "Apache-2.0",
    category: "software",
    tags: ["سهیل‌گیر", "Patent Grant", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://www.apache.org/licenses/LICENSE-2.0",
    summaryFa: "پروانه سهیل‌گیر با حمایت از حق اختراع و الزامات بیشتر",
    templatePlaceholders: ["year", "author"],
    template: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright {{year}} {{author}}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  {
    id: "gpl-3.0",
    name: "GNU General Public License v3.0",
    spdxId: "GPL-3.0-or-later",
    category: "software",
    tags: ["کپی‌لفت قوی", "اجازهٔ تجاری", "آثار مشتق مجاز", "انتشار مشابه"],
    officialUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
    summaryFa: "پروانه کپی‌لفت قوی که الزام انتشار کد مشتقات دارد",
    templatePlaceholders: ["year", "author", "project"],
    template: `{{project}}
Copyright (C) {{year}} {{author}}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  {
    id: "agpl-3.0",
    name: "GNU Affero General Public License v3.0",
    spdxId: "AGPL-3.0-or-later",
    category: "software",
    tags: ["کپی‌لفت شبکه", "اجازهٔ تجاری", "آثار مشتق مجاز", "انتشار مشابه"],
    officialUrl: "https://www.gnu.org/licenses/agpl-3.0.html",
    summaryFa: "پروانه کپی‌لفت که استفاده شبکه‌ای را نیز شامل می‌شود",
    templatePlaceholders: ["year", "author", "project"],
    template: `{{project}}
Copyright (C) {{year}} {{author}}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
    permissive: false,
    copyleft: "network",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: true,
    gplCompatible: true,
  },
  // Creative Commons licenses
  {
    id: "cc0",
    name: "CC0 1.0 Universal",
    spdxId: "CC0-1.0",
    category: "content",
    tags: ["Public Domain", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    summaryFa: "انتشار در مالکیت عمومی بدون هیچ محدودیتی",
    templatePlaceholders: ["author", "project"],
    template: `CC0 1.0 Universal

{{author}} has dedicated the work "{{project}}" to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: false,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "cc-by-4.0",
    name: "Creative Commons Attribution 4.0",
    spdxId: "CC-BY-4.0",
    category: "content",
    tags: ["الزام نسبت‌دهی", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/licenses/by/4.0/",
    summaryFa: "اجازه استفاده آزاد با الزام نسبت‌دهی",
    templatePlaceholders: ["author", "project"],
    template: `"{{project}}" by {{author}} is licensed under CC BY 4.0

This work is licensed under the Creative Commons Attribution 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  {
    id: "cc-by-sa-4.0",
    name: "Creative Commons Attribution-ShareAlike 4.0",
    spdxId: "CC-BY-SA-4.0",
    category: "content",
    tags: ["الزام نسبت‌دهی", "انتشار مشابه", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    summaryFa: "اجازه استفاده آزاد با الزام نسبت‌دهی و انتشار مشابه",
    templatePlaceholders: ["author", "project"],
    template: `"{{project}}" by {{author}} is licensed under CC BY-SA 4.0

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  // Data licenses
  {
    id: "pddl",
    name: "Public Domain Dedication and License",
    spdxId: "PDDL-1.0",
    category: "data",
    tags: ["Public Domain", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://opendatacommons.org/licenses/pddl/",
    summaryFa: "انتشار داده‌ها در مالکیت عمومی",
    templatePlaceholders: ["author", "project"],
    template: `This {{project}} made available by {{author}} is licensed under the Public Domain Dedication and License v1.0 whose full text can be found at: http://www.opendatacommons.org/licenses/pddl/1.0/`,
    permissive: true,
    copyleft: "none",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: false,
    patentGrant: false,
    gplCompatible: true,
  },
  {
    id: "odbl",
    name: "Open Database License",
    spdxId: "ODbL-1.0",
    category: "data",
    tags: ["الزام نسبت‌دهی", "انتشار مشابه", "اجازهٔ تجاری"],
    officialUrl: "https://opendatacommons.org/licenses/odbl/",
    summaryFa: "پروانه کپی‌لفت برای پایگاه‌های داده",
    templatePlaceholders: ["author", "project"],
    template: `This {{project}} made available by {{author}} is licensed under the Open Database License: http://opendatacommons.org/licenses/odbl/1.0/. Any rights in individual contents of the database are licensed under the Database Contents License: http://opendatacommons.org/licenses/dbcl/1.0/`,
    permissive: false,
    copyleft: "strong",
    commercial: true,
    derivatives: true,
    shareAlike: true,
    attribution: true,
    patentGrant: false,
    gplCompatible: false,
  },
  // Font license
  {
    id: "ofl",
    name: "SIL Open Font License 1.1",
    spdxId: "OFL-1.1",
    category: "font",
    tags: ["الزام نسبت‌دهی", "اجازهٔ تجاری", "آثار مشتق مجاز"],
    officialUrl: "https://scripts.sil.org/OFL",
    summaryFa: "پروانه استاندارد برای قلم‌های آزاد",
    templatePlaceholders: ["author", "project"],
    template: `Copyright (c) {{author}}, with Reserved Font Name {{project}}.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL`,
    permissive: true,
    copyleft: "weak",
    commercial: true,
    derivatives: true,
    shareAlike: false,
    attribution: true,
    patentGrant: false,
    gplCompatible: true,
  },
]
