from fastapi import HTTPException
from sqlalchemy import cast, func, Numeric
from sqlalchemy.orm import Session

from models.category import Category
from models.transaction import Transaction
from schemas.trend import CategoryFrequency, MostFrequentCategories, CategorySpending, MostExpensiveCategories


def get_most_frequent_categories(db: Session, user_id: int, year: int) -> MostFrequentCategories:
    """
    Returns the 5 categories with the biggest number of occurrences.
    """
    # Query to find the categories with the biggest number of occurrences
    category_counts = (
        db.query(
            Transaction.mcc,
            func.count().label('count')
        )
        .filter(
            Transaction.user_id == user_id, 
            Transaction.year == year
        )
        .group_by(Transaction.mcc) 
        .order_by(func.count().desc())
        .limit(5)
        .all()
    )

    # If no categories are found, raise an exception
    if not category_counts:
        raise HTTPException(status_code=404, detail="No categories found")
    
    top_categories = []
    for category_count in category_counts:
        # Retrieve MCC description from categories table
        category_description = (
            db.query(
                Category.general_description, 
                Category.full_description
            )
            .filter(Category.mcc == category_count.mcc)
            .first()
        )
        top_categories.append(
            CategoryFrequency(
                full_description=category_description.full_description,
                general_description=category_description.general_description,
                num_occurrences=category_count.count
            )
        )

    # Create a MostFrequentCategories object and return
    most_frequent_categories = MostFrequentCategories(top_categories=top_categories)
    return most_frequent_categories


def get_most_expensive_categories(db: Session, user_id: int, year: int) -> MostExpensiveCategories:
    """
    Returns the 5 categories in which the user spent the most.
    """
    # Query to find the categories with the biggest sum of amounts
    category_totals = (
        db.query(
            Transaction.mcc,
            cast(func.sum(Transaction.amount), Numeric(10, 0)).label('total')
        )
        .filter(
            Transaction.user_id == user_id, 
            Transaction.year == year
        )
        .group_by(Transaction.mcc) 
        .order_by(func.sum(Transaction.amount).desc())
        .limit(5)
        .all()
    )

    # If no categories are found, raise an exception
    if not category_totals:
        raise HTTPException(status_code=404, detail="No categories found")
    
    top_categories = []
    for category_total in category_totals:
        # Retrieve MCC description from categories table
        category_description = (
            db.query(
                Category.general_description, 
                Category.full_description
            )
            .filter(Category.mcc == category_total.mcc)
            .first()
        )
        top_categories.append(
            CategorySpending(
                full_description=category_description.full_description,
                general_description=category_description.general_description,
                total_amount=category_total.total
            )
        )

    # Create a MostExpensiveCategories object and return
    most_expensive_categories = MostExpensiveCategories(top_categories=top_categories)
    return most_expensive_categories