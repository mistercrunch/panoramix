# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
from flask_appbuilder.models.sqla.interface import SQLAInterface

import superset.models.core as models
from superset.views.base import BaseSupersetModelRestApi

from .mixins import DatabaseFilter, DatabaseMixin
from .validators import sqlalchemy_uri_validator


class DatabaseRestApi(DatabaseMixin, BaseSupersetModelRestApi):
    datamodel = SQLAInterface(models.Database)
    include_route_methods = {"get_list"}

    class_permission_name = "DatabaseView"
    resource_name = "database"
    allow_browser_login = True
    base_filters = [["id", DatabaseFilter, lambda: []]]
    list_columns = [
        "id",
        "database_name",
        "expose_in_sqllab",
        "allow_ctas",
        "force_ctas_schema",
        "allow_run_async",
        "allow_dml",
        "allow_multi_schema_metadata_fetch",
        "allow_csv_upload",
        "allows_subquery",
        "allows_cost_estimate",
        "backend",
    ]
    show_columns = list_columns

    # Removes the local limit for the page size
    max_page_size = -1
    validators_columns = {"sqlalchemy_uri": sqlalchemy_uri_validator}
