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
from typing import Dict, Optional

from flask_appbuilder.models.filters import BaseFilter
from flask_appbuilder.models.sqla import Model
from flask_appbuilder.models.sqla.interface import SQLAInterface
from sqlalchemy.exc import SQLAlchemyError

from superset.dao.exceptions import (
    DAOConfigError,
    DAOCreateFailedError,
    DAODeleteFailedError,
    DAOUpdateFailedError,
)
from superset.extensions import db


class BaseDAO:
    model_cls: Optional[Model] = None
    base_filter: Optional[BaseFilter] = None

    @classmethod
    def find_by_id(cls, model_id: int) -> Model:
        query = db.session.query(cls.model_cls)
        if cls.base_filter:
            data_model = SQLAInterface(cls.model_cls, db.session)
            query = cls.base_filter(  # pylint: disable=not-callable
                "id", data_model
            ).apply(query, None)
        return query.filter_by(id=model_id).one_or_none()

    @classmethod
    def create(cls, properties: Dict, commit=True) -> Optional[Model]:
        """
            Generic for creating models
        """
        if cls.model_cls is None:
            raise DAOConfigError()
        model = cls.model_cls()  # pylint: disable=not-callable
        for key, value in properties.items():
            setattr(model, key, value)
        try:
            db.session.add(model)
            if commit:
                db.session.commit()
        except SQLAlchemyError as e:  # pragma: no cover
            db.session.rollback()
            raise DAOCreateFailedError(exception=e)
        return model

    @classmethod
    def update(cls, model: Model, properties: Dict, commit=True) -> Optional[Model]:
        """
            Generic update a model
        """
        for key, value in properties.items():
            setattr(model, key, value)
        try:
            db.session.merge(model)
            if commit:
                db.session.commit()
        except SQLAlchemyError as e:  # pragma: no cover
            db.session.rollback()
            raise DAOUpdateFailedError(exception=e)
        return model

    @classmethod
    def delete(cls, model: Model, commit=True):
        """
            Generic delete a model
        """
        try:
            db.session.delete(model)
            if commit:
                db.session.commit()
        except SQLAlchemyError as e:  # pragma: no cover
            db.session.rollback()
            raise DAODeleteFailedError(exception=e)
        return model
